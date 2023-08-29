import { forwardRef } from "react";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  errorMessage?: string;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(function Label(
  { errorMessage, children, className, ...props },
  ref
) {
  return (
    <div className="flex flex-col gap-2">
      <label ref={ref} className="label flex gap-4" {...props}>
        {children}
      </label>
      {errorMessage && <p className="text-red-400 text-sm block self-end">{errorMessage}</p>}
    </div>
  );
});
