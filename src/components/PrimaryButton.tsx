function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}
const PrimaryButton = ({ text, click, classes }: { text: string, click?: () => void, classes?: string }) => {
    return (
        <button onClick={click} className={classNames(classes ?? '', 'bg-primary px-4 py-2 rounded shadow hover:shadow-lg text-white font-semibold hover:bg-emerald-400 active:bg-primary')}>{text}</button>
    );
}

export default PrimaryButton;