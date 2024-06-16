import { CloudUpload } from "lucide-react";
import { Button } from "./ui/button";

function Upload() {
    return (
        <section className="container py-20 box-border">
            <div className="w-full h-[70vh] flex items-center justify-center">
                <div className="w-full bg-slate-300 max-w-lg h-80 rounded-md flex items-center justify-center border-dashed border-2 border-slate-500">
                    <label htmlFor="upload">
                        <Button>
                            <CloudUpload />
                            <p>Click to upload</p>
                        </Button>
                        <p className="font-semibold"></p>
                        <input type="file" className="hidden" id="upload" />
                    </label>
                </div>
            </div>
        </section>
    );
}

export default Upload;
