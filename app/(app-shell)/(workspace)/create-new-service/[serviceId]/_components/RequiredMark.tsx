/** Red asterisk for required form labels (visual + screen readers via parent label). */
export function RequiredMark() {
  return (
    <span className="text-red-500 ml-0.5 font-semibold" aria-hidden>
      *
    </span>
  );
}
