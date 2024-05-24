import { SideBarHead } from '../models/sidebar.model';

export const SidebarItems: SideBarHead[] = [
  {
    label: 'Menü',
    items: [{ label: 'Anasayfa', icon: 'columns', link: '/dashboard' }],
  },
  {
    label:'İstemciler',
    items: [
      { label: 'İstemci Listesi', icon: 'pc-display', link: '/client' }
    ],
  },
  {
    label: 'İşlemler',
    items: [
      { label: 'Hesapları Yönet', icon: 'people', link: '/user' }
    ],
  }
];
