/** Rota atual: "/arte" abre o portfólio de arte; qualquer outra abre a Home. */
export function isArtRoute(): boolean {
  return window.location.pathname.replace(/\/+$/, '') === '/arte'
}
