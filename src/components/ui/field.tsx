export function Field({
  label,
  name,
  type = "text",
  autoComplete,
  required,
  errors,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  errors?: string[];
  defaultValue?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        defaultValue={defaultValue}
        className="rounded-lg border border-border bg-surface px-3.5 py-2.5 text-foreground placeholder:text-muted outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
      />
      {errors?.map((err) => (
        <p key={err} className="text-sm text-danger">
          {err}
        </p>
      ))}
    </div>
  );
}
