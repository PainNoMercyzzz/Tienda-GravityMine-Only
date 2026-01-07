
export enum Page {
  HOME = 'inicio',
  REALM = 'realm',
  SHOP = 'tienda',
  RULES = 'reglas',
  STAFF = 'staff'
}

export interface Kit {
  id: string;
  name: string;
  price: number;
  description: string;
  link: string;
  color: string;
  image: string;
}

export interface Rule {
  id: number;
  text: string;
}
