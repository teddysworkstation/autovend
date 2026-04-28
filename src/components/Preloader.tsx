import preloaderIcon from "@/assets/vmh-preloader.png";

export default function Preloader({ size = 64, label }: { size?: number; label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3" role="status" aria-label={label || "Loading"}>
      <img
        src={preloaderIcon}
        alt=""
        width={size}
        height={size}
        className="vmh-spin"
        style={{ width: size, height: size }}
      />
      {label && <p className="text-sm text-muted-foreground font-medium">{label}</p>}
    </div>
  );
}
