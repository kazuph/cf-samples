import { Button } from "@/components/ui/button";

export const Header = () => {
    return (
        <div className="fixed flex justify-between px-8 w-screen h-16 bg-teal-400 items-center drop-shadow-2xl border-b border-gray-300 shadow-md">
            <h1 className="font-bold text-2xl">Honox x shadcn-ui DEMO</h1>
            <div className="flex gap-3">
                <Button>menu</Button>
            </div>
        </div>
    );
};
