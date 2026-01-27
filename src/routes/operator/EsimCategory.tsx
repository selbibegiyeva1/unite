import { useState } from 'react';
import Country from '../../components/operator/esim/Country';
import Tariff from '../../components/operator/esim/Tariff';
import EsimFaq from '../../components/operator/esim/EsimFaq';
import type { EsimTab } from '../../hooks/operator/esim/useEsimLocations';

function EsimCategory() {
    document.title = 'Unite Shop - eSIM';
    const [activeTab, setActiveTab] = useState<EsimTab>('countries');
    // Defaults:
    // - countries: Afghanistan -> AF
    // - regions: Africa -> africa
    const [selectedCodeForApi, setSelectedCodeForApi] = useState<string | null>('AF');
    const [selectedName, setSelectedName] = useState<string | null>(null);
    const [selectedFlagUrl, setSelectedFlagUrl] = useState<string | null>(null);

    return (
        <div className='px-6 mt-[28px] pb-[100px]'>
            <div className='w-[1680px] m-auto'>
                <p className='text-[36px] font-bold'>e-SIM</p>
                <div className='mt-8 mb-[56px]'>
                    <Country
                        activeTab={activeTab}
                        setActiveTab={(tab) => {
                            setActiveTab(tab);
                            // Set default selection when switching between tabs
                            if (tab === 'countries') {
                                setSelectedCodeForApi('AF');
                            } else {
                                setSelectedCodeForApi('africa');
                            }
                            setSelectedName(null);
                            setSelectedFlagUrl(null);
                        }}
                        onSelectLocation={({ codeForApi, displayName, imageUrl }) => {
                            setSelectedCodeForApi(codeForApi);
                            setSelectedName(displayName);
                            setSelectedFlagUrl(imageUrl);
                        }}
                    />
                </div>
                <div className='mb-[72px]'>
                    <Tariff
                        activeTab={activeTab}
                        selectedCodeForApi={selectedCodeForApi}
                        selectedName={selectedName}
                        selectedFlagUrl={selectedFlagUrl}
                    />
                </div>
                <EsimFaq />
            </div>
        </div>
    )
}

export default EsimCategory