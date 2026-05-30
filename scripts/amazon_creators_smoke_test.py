#!/usr/bin/env python3
"""Smoke test for Amazon Creators API credentials.

Loads local `.env`, makes one small SearchItems request, and prints only
non-sensitive status fields. Requires `python-amazon-paapi`.
"""

from __future__ import annotations

import os
from pathlib import Path


def load_env(path: Path) -> None:
    if not path.exists():
        return
    for line in path.read_text().splitlines():
        stripped = line.strip()
        if not stripped or stripped.startswith("#") or "=" not in stripped:
            continue
        key, value = stripped.split("=", 1)
        os.environ.setdefault(key, value)


def redact(message: str) -> str:
    for key in ("AMAZON_CREATOR_SECRET", "AMAZON_CREATOR_CREDENTIAL_ID"):
        value = os.environ.get(key)
        if value:
            message = message.replace(value, f"[{key}]")
    return message


def main() -> int:
    load_env(Path(".env"))

    try:
        from amazon_creatorsapi import AmazonCreatorsApi
    except ImportError:
        print("amazon_creators_api=ERROR")
        print("error_message=Missing package. Install with: python3 -m pip install --user python-amazon-paapi")
        return 1

    required = [
        "AMAZON_CREATOR_CREDENTIAL_ID",
        "AMAZON_CREATOR_SECRET",
        "AMAZON_CREATOR_VERSION",
        "AMAZON_ASSOCIATE_TAG",
    ]
    missing = [key for key in required if not os.environ.get(key)]
    if missing:
        print("amazon_creators_api=ERROR")
        print("missing=" + ",".join(missing))
        return 1

    try:
        api = AmazonCreatorsApi(
            credential_id=os.environ["AMAZON_CREATOR_CREDENTIAL_ID"],
            credential_secret=os.environ["AMAZON_CREATOR_SECRET"],
            version=os.environ["AMAZON_CREATOR_VERSION"],
            tag=os.environ["AMAZON_ASSOCIATE_TAG"],
            country=os.environ.get("AMAZON_COUNTRY", "US"),
            throttling=1,
        )
        result = api.search_items(
            keywords=os.environ.get("AMAZON_SMOKE_TEST_QUERY", "melatonin gummies"),
            search_index=os.environ.get("AMAZON_SMOKE_TEST_INDEX", "HealthPersonalCare"),
            item_count=1,
        )
        items = getattr(result, "items", None) or getattr(result, "Items", None) or []
        print("amazon_creators_api=OK")
        print("items_returned=" + str(len(items)))
        if items:
            item = items[0]
            asin = getattr(item, "asin", None) or getattr(item, "ASIN", None)
            print("first_asin=" + str(asin))
        return 0
    except Exception as exc:
        print("amazon_creators_api=ERROR")
        print("error_type=" + exc.__class__.__name__)
        print("error_message=" + redact(str(exc))[:1200])
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
