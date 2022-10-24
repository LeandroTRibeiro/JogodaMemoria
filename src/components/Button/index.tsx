type Props = {
    label: string;
    icon?: any;
    onClick: React.MouseEventHandler<HTMLDivElement>;
}

export const Button = ({label, icon, onClick}: Props) => {
    return (
        <div onClick={onClick} className="bg-orange-500 w-52 h-12 cursor-pointer rounded-md hover:opacity-75 active:opacity-60 flex items-center justify-center hover:transition-all ease-in duration-300 tb:ml-10 mg:ml-10 drop-shadow-lg
        ">
            {icon &&
                <div className="h-12 flex justify-center items-center border-r-[0.5px] px-3 ms:px-1"><img src={icon} alt="btn" className="h-5" /></div>
            }
            <div className="text-white flex-1 font-ligh tracking-widest px-5 flex justify-center items-center">{label}</div>
        </div>
    );
}
