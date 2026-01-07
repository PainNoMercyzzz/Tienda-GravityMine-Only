import { Kit, Rule } from './types';

export const KITS: Kit[] = [
  {
    id: 'mistico',
    name: 'Kit Místico',
    price: 8,
    description: 'Próximamente',
    link: '#',
    color: 'border-green-500',
    image: 'https://cdn.discordapp.com/attachments/778272600891588650/1458272697212473568/kit_mistico.jpeg?ex=695f09c8&is=695db848&hm=5a453bba41cbe6ca0a09c81da9347216e03eea99f581c4c1e9e2b7e413b351b0'
  },
  {
    id: 'deidad',
    name: 'Kit Deidad',
    price: 15,
    description: 'Próximamente',
    link: '#',
    color: 'border-green-500',
    image: 'https://cdn.discordapp.com/attachments/778272600891588650/1458272697653133363/kit_deidad.jpeg?ex=695f09c8&is=695db848&hm=db702ced31dcb3b92d1b384e548f2b83fb260a539851aadc8c53bc781c9d7c7a'
  },
  {
    id: 'arcano',
    name: 'Kit Arcano',
    price: 12,
    description: 'Próximamente',
    link: '#',
    color: 'border-green-500',
    image: 'https://cdn.discordapp.com/attachments/778272600891588650/1458272696885579807/kit_arcano.jpeg?ex=695f09c8&is=695db848&hm=44fa6b0bb881a9693e77e69e94cb024c2bbea14a6140e214242aa0da0e653cff'
  }
];

export const RULES: Rule[] = [
  { id: 1, text: 'No hacer griefing (destruir construcciones ajenas).' },
  { id: 2, text: 'Respetar a todos los jugadores y miembros del staff.' },
  { id: 3, text: 'No usar hacks, hacks de movimiento o X-Ray.' },
  { id: 4, text: 'No hacer spam en el chat global.' },
  { id: 5, text: 'No robar en zonas protegidas o cofres privados.' },
  { id: 6, text: 'Divertirse y seguir el espíritu del Survival.' }
];

export const DISCORD_LINK = "https://discord.gg/buqvwUxaj3";
export const OWNER_NICK = "Staff de GravityMine";