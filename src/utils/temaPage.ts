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

export function checkTheme(){
  const tema = localStorage.getItem('tema');

  if(!tema || tema === 'sistema'){
    localStorage.setItem('tema', 'sistema');

    if(window.matchMedia('(prefers-color-scheme: dark)').matches){
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }

  if(tema === 'oscuro'){
    document.body.classList.add('dark');
  } else if(tema === 'claro'){
    document.body.classList.remove('dark');
  }
}