export interface Category {
  id: string;
  name: string;
  slug: string;
  prefix: string;
  description: string;
  icon: string;
  volume: number;
  priority: number;
}

export const categories: Category[] = [
  {
    id: 'sports',
    name: 'Sports & Fitness',
    slug: 'sports',
    prefix: '/sports/',
    description: 'Creatine, protein, pre-workout, and energy gummies for athletes and fitness enthusiasts.',
    icon: 'fitness',
    volume: 110470,
    priority: 1,
  },
  {
    id: 'mushroom',
    name: 'Mushrooms & Adaptogens',
    slug: 'mushroom',
    prefix: '/mushroom/',
    description: 'Ashwagandha, lion\'s mane, reishi, and functional mushroom gummies for stress and focus.',
    icon: 'mushroom',
    volume: 109430,
    priority: 2,
  },
  {
    id: 'sleep',
    name: 'Sleep & Relaxation',
    slug: 'sleep',
    prefix: '/sleep/',
    description: 'Melatonin, magnesium, and calming gummies for better sleep and relaxation.',
    icon: 'moon',
    volume: 118570,
    priority: 3,
  },
  {
    id: 'trending',
    name: 'Trending & Emerging',
    slug: 'trending',
    prefix: '/trending/',
    description: 'Sea moss, berberine, shilajit, and the latest trending supplement gummies.',
    icon: 'trending',
    volume: 25290,
    priority: 4,
  },
  {
    id: 'beauty',
    name: 'Beauty & Hair',
    slug: 'beauty',
    prefix: '/beauty/',
    description: 'Collagen, biotin, and hair growth gummies for skin, hair, and nails.',
    icon: 'sparkle',
    volume: 21880,
    priority: 5,
  },
  {
    id: 'vitamins',
    name: 'Vitamins & Health',
    slug: 'vitamins',
    prefix: '/vitamins/',
    description: 'Multivitamin, fiber, iron, and probiotic gummies for everyday wellness.',
    icon: 'pill',
    volume: 99620,
    priority: 6,
  },
  {
    id: 'weight-loss',
    name: 'Weight & Metabolism',
    slug: 'weight-loss',
    prefix: '/weight-loss/',
    description: 'Apple cider vinegar, metabolism, and weight management gummies.',
    icon: 'scale',
    volume: 50470,
    priority: 7,
  },
  {
    id: 'immunity',
    name: 'Immunity',
    slug: 'immunity',
    prefix: '/immunity/',
    description: 'Elderberry, turmeric, and immune support gummies to keep you healthy.',
    icon: 'shield',
    volume: 21460,
    priority: 8,
  },
];

export function getCategory(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function getAllCategories(): Category[] {
  return [...categories].sort((a, b) => a.priority - b.priority);
}
