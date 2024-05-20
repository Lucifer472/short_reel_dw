"use client";
import { useRef, useState, useTransition } from "react";

import { Download } from "@/actions/download";
import { validateUrl } from "@/lib/utils";

const SearchForm = () => {
  const [textArea, setTextArea] = useState("");
  const [isPending, startTransition] = useTransition();

  const form = useRef<HTMLFormElement>(null);

  const onSubmit = (v: React.FormEvent<HTMLFormElement>) => {
    v.preventDefault();

    const data = new FormData(v.currentTarget);

    const url = data.get("search");

    if (url == null) {
      return alert("Invalid URL");
    }

    const validURl = validateUrl(url.toString());

    if (validURl.error) {
      return alert(validURl.error);
    }

    if (validURl.success) {
      startTransition(() => {
        Download(validURl.success.href).then((res: any) => {
          if (res.error) {
            alert(res.error);
          }

          if (res.success) {
            if (res.success === "ins") {
              res.list.forEach((s: any) => {
                window.open(s.download_link, "_blank");
              });
            }

            if (res.success === "yt") {
              window.open(res.path, "_blank");
            }
          }
        });
      });
      if (form.current) {
        form.current.reset();
      }
      return;
    }

    return alert("Something went wrong");
  };

  const handlePaste = () => {
    if (navigator) {
      navigator.clipboard.readText().then((res) => {
        setTextArea(res);
      });
    }
  };

  return (
    <form
      ref={form}
      className="w-full flex flex-col gap-2"
      onSubmit={(e) => onSubmit(e)}
    >
      <textarea
        rows={1}
        name="search"
        defaultValue={textArea}
        placeholder="Paste Link.."
        className="w-full px-2 py-1 rounded-md border border-gray-200 text-xs resize-none"
      />
      <button
        type="submit"
        className="w-full bg-sky-400 rounded-md text-white py-2 text-sm"
      >
        Download
      </button>
      <button
        onClick={handlePaste}
        type="button"
        className="w-full bg-sky-400 rounded-md text-white py-2 text-sm"
      >
        Paste Text
      </button>
    </form>
  );
};

export default SearchForm;
