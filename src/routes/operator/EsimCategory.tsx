import { useState } from 'react';
import Country from '../../components/operator/esim/Country';
import Tariff from '../../components/operator/esim/Tariff';
import EsimFaq from '../../components/operator/esim/EsimFaq';

function EsimCategory() {
    document.title = 'Unite Shop - eSIM';
    const [activeTab, setActiveTab] = useState<'countries' | 'regions'>('countries');

    return (
        <div className='px-6 mt-[28px] pb-[100px]'>
            <div className='w-[1680px] m-auto'>
                <p className='text-[36px] font-bold'>e-SIM</p>
                <div className='mt-8 mb-[56px]'>
                    <Country activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>
                <div className='mb-[72px]'>
                    <Tariff activeTab={activeTab} />
                </div>
                <EsimFaq />
            </div>
        </div>
    )
}

export default EsimCategory