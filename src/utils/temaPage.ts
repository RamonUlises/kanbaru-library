// tema.ts (módulo compartido)

export const TemaEvents = new EventTarget();

export function cambiarTema(tema: string) {
  localStorage.setItem("tema", tema);

  // Aplica el tema como ya lo haces tú
  if (tema === "sistema") {
    const temaSistema = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    if (temaSistema) {
      document.documentElement.classList.add("dark");
      document.documentElement.style.setProperty("--scrollbar-1", "#F0F0F0");
      document.documentElement.style.setProperty("--scrollbar-2", "#000000");
      TemaEvents.dispatchEvent(
        new CustomEvent("tema-cambiado", { detail: "oscuro" }),
      );
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.setProperty("--scrollbar-1", "#A0826F");
      document.documentElement.style.setProperty("--scrollbar-2", "#EFEBE5");
      TemaEvents.dispatchEvent(
        new CustomEvent("tema-cambiado", { detail: "claro" }),
      );
    }
  }

  if (tema === "oscuro") {
    document.documentElement.classList.add("dark");
    document.documentElement.style.setProperty("--scrollbar-1", "#F0F0F0");
    document.documentElement.style.setProperty("--scrollbar-2", "#000000");
    TemaEvents.dispatchEvent(
      new CustomEvent("tema-cambiado", { detail: "oscuro" }),
    );
  }

  if (tema === "claro") {
    document.documentElement.classList.remove("dark");
    document.documentElement.style.setProperty("--scrollbar-1", "#A0826F");
    document.documentElement.style.setProperty("--scrollbar-2", "#EFEBE5");
    TemaEvents.dispatchEvent(
      new CustomEvent("tema-cambiado", { detail: "claro" }),
    );
  }
}

export function getTema() {
  const tema = localStorage.getItem("tema");

  if (tema === "sistema" || tema == null) {
    const temaSistema = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    if (temaSistema) {
      return "oscuro";
    } else {
      return "claro";
    }
  }

  return tema;
}
