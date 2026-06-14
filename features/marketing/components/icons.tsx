import type { SVGProps } from "react";

export function ApplePhoneIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17.564 13.296c-.028-2.832 2.31-4.193 2.418-4.258-1.318-1.923-3.367-2.187-4.094-2.218-1.74-.176-3.4 1.024-4.286 1.024-.886 0-2.245-.998-3.69-.971-1.898.028-3.65 1.103-4.628 2.802-1.978 3.43-.504 8.495 1.413 11.275.94 1.358 2.054 2.881 3.518 2.826 1.418-.056 1.953-.92 3.665-.92 1.713 0 2.193.92 3.689.892 1.525-.027 2.49-1.382 3.42-2.747 1.083-1.574 1.526-3.1 1.552-3.18-.034-.013-2.953-1.132-2.977-4.493zM14.875 5.078c.78-.946 1.308-2.262 1.163-3.572-1.124.046-2.488.748-3.296 1.692-.724.836-1.36 2.176-1.189 3.46 1.255.097 2.539-.638 3.322-1.58z" />
    </svg>
  );
}

export function GooglePhoneIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M3.609 1.814 13.792 12 3.609 22.186a1.62 1.62 0 0 1-.84-1.418V3.232c0-.594.331-1.11.84-1.418zm10.831 10.84 2.658 2.658-13.184 7.517 10.526-10.175zm0-1.308L4.014 1.171 17.097 8.688l-2.658 2.658zm6.503 2.658-2.829 1.622-3.066-3.066 3.066-3.066 2.829 1.622c1.04.59 1.04 2.298 0 2.888z" />
    </svg>
  );
}

export function ArrowRightUp(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}
