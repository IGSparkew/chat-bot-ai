import { useState } from "react";



interface Props {
    contentInfo: string;
}

const InfoMessage = ({contentInfo}: Props) => {
    const [showInfo, setShowInfo] = useState(false);

    return (
        <a onClick={() => setShowInfo((shi) => !shi)}>
            {
                !showInfo && contentInfo && <div className="bg-gray-500 flex flex-row-reverse">  
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                </svg>
                <p className="text-white">
                info
                </p>  
                </div>

            }
            {
                showInfo && contentInfo && <div className="bg-gray-500">
                    <div className="text-white">{contentInfo}</div>
                </div>
            }
            
        </a>
    );

};


export default InfoMessage;