import Xray from '../../components/Xray';

export default function Resume1() {

    const apiEntryPoint = process.env.API_URL;

    return (
        <main className="px-4 md:px-16 lg:px-32 xl:px-48 py-4">

            <Xray apiEntryPoint={apiEntryPoint} />
           
        </main>
    );
};