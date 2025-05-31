import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cambiarTema } from "@/utils/temaPage";
import { ChartColumn, Computer, LogOutIcon, Moon, Palette, Sun, User } from "lucide-react";

export function OpcionesMenu() {
  function navigate(href: string) {
    window.location.href = href;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center p-2 rounded-full cursor-pointer outline-none bg-principal-400 dark:bg-zinc-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-dots"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
            <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
            <path d="M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
          </svg>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 z-99999 bg-principal-600 dark:bg-zinc-800"
        align="start"
      >
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => navigate("/perfil")}
            className="text-white focus:bg-principal-500 cursor-pointer focus:text-white dark:focus:bg-zinc-700"
          >
            <User className="text-white dark:text-zinc-200" />
            Perfil
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="gap-2 text-white focus:bg-principal-500 focus:text-white data-[state=open]:bg-principal-500 data-[state=open]:text-white dark:data-[state=open]:bg-zinc-700 dark:focus:bg-zinc-700">
              <Palette width={16} height={16} className="text-white dark:text-zinc-200" />
              Tema
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="bg-principal-600 dark:bg-zinc-800">
                <DropdownMenuItem className="text-white focus:bg-principal-500 cursor-pointer focus:text-white dark:focus:bg-zinc-700" onClick={() => cambiarTema("sistema")}>
                  <Computer className="text-white dark:text-zinc-200" />
                  Sistema
                </DropdownMenuItem>
                <DropdownMenuItem className="text-white focus:bg-principal-500 cursor-pointer focus:text-white dark:focus:bg-zinc-700" onClick={() => cambiarTema("claro")}>
                  <Sun className="text-white dark:text-zinc-200" />
                  Claro
                </DropdownMenuItem>
                <DropdownMenuItem className="text-white focus:bg-principal-500 cursor-pointer focus:text-white dark:focus:bg-zinc-700" onClick={() => cambiarTema("oscuro")}>
                  <Moon className="text-white dark:text-zinc-200" />
                  Oscuro
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem
            onClick={() => navigate("/crear-grafico")}
            className="text-white focus:bg-principal-500 cursor-pointer focus:text-white dark:focus:bg-zinc-700"
          >
            <ChartColumn className="text-white dark:text-zinc-200" />
            Crear gráfica
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-white focus:bg-principal-500 cursor-pointer focus:text-white dark:focus:bg-zinc-700">
          <LogOutIcon className="text-white dark:text-zinc-200" />
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
