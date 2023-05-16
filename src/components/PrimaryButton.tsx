export function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}
const PrimaryButton = ({ text, click, classes, disabled }: { text: string, click?: () => void, classes?: string, disabled?: boolean }) => {
    return (
        <button onClick={click} disabled={disabled} className={classNames(classes ?? '', 'bg-primary px-4 py-2 rounded shadow hover:shadow-lg text-white font-semibold hover:bg-emerald-400 active:bg-primary')}>{text}</button>
    );
}

export default PrimaryButton;