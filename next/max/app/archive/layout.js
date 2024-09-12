import MainHeader from "@/components/main-header";

export default function ArchiveLayout({ archive, latest }) {
    return (
        <>
        <MainHeader />

    <div>
            <h1>
                News Archive
            </h1>
            <div>
                <section>
                    {archive}
                </section>
                <hr />
                <section>
                    {latest}
                </section>
            </div>

        </div>
        </>
    )
}