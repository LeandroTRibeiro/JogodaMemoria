type Props = {
    label: string;
    value: string;
    playing: boolean;
}

export const InfoItem = ({label, value, playing}: Props): JSX.Element => {
    return (
        <div className={playing ? "mt-5 mb-5 mg:flex mg:flex-col animate-pulse" : "mt-5 mb-5 mg:flex mg:flex-col"}>
            <div className={playing ? "font-semibold text-orange-400": "font-semibold text-yellow-400"}>{label}</div>
            <div className={playing ? "font-bold text-orange-500 text-5xl" : "font-bold text-yellow-400 text-5xl"}>{value}</div>
        </div>

    );
}