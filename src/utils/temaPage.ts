export function cambiarTema(tema: string){
  localStorage.setItem('tema', tema);

  if(tema === 'sistema'){
    const temaSistema = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if(temaSistema){
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }
  if(tema === 'oscuro'){
    document.body.classList.add('dark');
  }

  if(tema === 'claro'){
    document.body.classList.remove('dark');
  }
}