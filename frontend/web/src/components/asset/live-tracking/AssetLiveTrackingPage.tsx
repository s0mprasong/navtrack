import { useCurrentAsset } from "@navtrack/shared/hooks/assets/useCurrentAsset";
import { FormattedMessage } from "react-intl";
import { Card } from "../../ui/shared/card/Card";
import { Map } from "../../ui/shared/map/Map";
import { LocationBar } from "../shared/location-bar/LocationBar";
import { LiveTrackingMapPin } from "./LiveTrackingMapPin";

export function AssetLiveTrackingPage() {
  const currentAsset = useCurrentAsset();

  return (
    <>
      {currentAsset.data?.location ? (
        <>
          <Card className="p-2">
            <LocationBar location={currentAsset.data.location} />
          </Card>
          <div className="flex flex-grow rounded-lg bg-white shadow">
            <Map
              center={{
                latitude: 0,
                longitude: 0
              }}
              zoom={16}>
              <LiveTrackingMapPin />
            </Map>
          </div>
        </>
      ) : (
        <Card className="flex p-2 text-sm">
          <FormattedMessage id="no-location-data" />
        </Card>
      )}
    </>
  );
}
