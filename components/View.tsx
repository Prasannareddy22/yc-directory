import Ping from "@/components/Ping";
import { client } from "@/sanity/lib/client";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";

const View = async ({ id }: { id: string }) => {
    try {
        const result = await client
            .withConfig({ useCdn: false })
            .fetch(STARTUP_VIEWS_QUERY, { id });

        const totalViews = result?.views || 0;

        // Update views in background
        writeClient
            .patch(id)
            .set({ views: totalViews + 1 })
            .commit()
            .catch(console.error);

        return (
            <div className="view-container">
                <div className="absolute -top-2 -right-2">
                    <Ping />
                </div>
                <p className="view-text">
                    <span className="font-black">Views: {totalViews}</span>
                </p>
            </div>
        );
    } catch (error) {
        console.error(error);
        return null;
    }
};
export default View;