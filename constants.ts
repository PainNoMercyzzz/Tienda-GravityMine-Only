
import { Kit, Rule } from './types';

export const KITS: Kit[] = [
  {
    id: 'mistico',
    name: 'Kit Místico',
    price: 8,
    description: 'Espada encantada púrpura, armadura básica, pociones y más recursos útiles.',
    link: 'https://paypal.me/GravityMine/8EUR',
    color: 'border-purple-500',
    image: 'images/kit-mistico.png'
  },
  {
    id: 'arcano',
    name: 'Kit Arcano',
    price: 12,
    description: 'Espada arcana poderosa, armadura media, tótem de inmortalidad y efectos mágicos.',
    link: 'https://paypal.me/GravityMine/12EUR',
    color: 'border-blue-500',
    image: 'images/kit-arcano.png'
  },
  {
    id: 'deidad',
    name: 'Kit Deidad',
    price: 15,
    description: 'Espada divina, armadura completa de netherite, elytra, shulker box y todo lo épico.',
    link: 'https://paypal.me/GravityMine/15EUR',
    color: 'border-yellow-500',
    image: 'images/kit-deidad.png'
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
