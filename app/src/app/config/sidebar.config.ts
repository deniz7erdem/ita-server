import { SideBarHead } from '../models/sidebar.model';

export const SidebarItems: SideBarHead[] = [
  {
    label: 'Menü',
    items: [{ label: 'Anasayfa', icon: 'columns', link: '/dashboard' }],
  },
  {
    label: 'İşlemler',
    items: [
      { label: 'Hesapları Yönet', icon: 'person', link: '/user' }
    ],
  }
];
