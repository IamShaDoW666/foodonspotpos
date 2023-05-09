import Link from "next/link";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}
const PrimaryLink = ({ text, href, classes }: { text: string, href: string, classes?: string }) => {
    return (
        <Link href={href} className={classNames(classes ?? '', 'bg-primary px-4 py-2 rounded shadow hover:shadow-lg text-white font-semibold hover:bg-emerald-400 active:bg-primary')}>{text}</Link>
    );
}

export default PrimaryLink;