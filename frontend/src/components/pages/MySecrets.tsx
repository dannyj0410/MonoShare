import { useMySecrets } from "../../hooks/secretHooks/useMySecrets";
import BackButton from "../partials/MainPartials/BackButton";
import ConfirmationPopup from "../partials/MainPartials/ConfirmationPopup";
import MySecretsEmptyList from "../partials/MySecretsPartials/MySecretsEmptyList";
import MySecretsItem from "../partials/MySecretsPartials/MySecretsItem";
import { useMemo, useState } from "react";

const MySecrets = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedSecret, setSelectedSecret] = useState<string>("");
  const { data: mySecrets, isPending } = useMySecrets();

  const activeSecrets = useMemo(
    () => mySecrets?.ownedSecrets.filter((s) => s.status === "ACTIVE") || [],
    [mySecrets],
  );
  const viewedSecrets = useMemo(
    () => mySecrets?.ownedSecrets.filter((s) => s.status === "VIEWED") || [],
    [mySecrets],
  );
  const expiredSecrets = useMemo(
    () => mySecrets?.ownedSecrets.filter((s) => s.status === "EXPIRED") || [],
    [mySecrets],
  );

  if (!mySecrets || isPending) {
    return <></>;
  }

  return (
    <main className="min-h-screen w-screen pb-10 bg-[#01090f]">
      <ConfirmationPopup
        option="Erase"
        secret={selectedSecret}
        isOpen={isDeleting}
        setOpen={setIsDeleting}
      />
      <div className="flex flex-col justify-center items-center">
        <h1 className="mt-20 electrolize font-bold">My Secrets</h1>

        {/*//* Active */}
        <section className="relative flex flex-col w-200">
          <div className="absolute -left-40 top-16.75 opacity-70 hover:opacity-100">
            <BackButton />
          </div>
          <div className="flex items-center h-fit mt-20 justify-between mb-2 w-190">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#76c4ff"
                strokeLinecap="round"
                strokeLinejoin="round"
                id="Loader-2--Streamline-Tabler"
                height="18"
                width="18"
              >
                <desc>Loader 2 Streamline Icon: https://streamlinehq.com</desc>
                <path d="M12 3a9 9 0 1 0 9 9" strokeWidth="2"></path>
              </svg>
              <h1 className="electrolize text-(--main-light-blue) font-bold tracking-wider">
                Active
              </h1>
            </div>
            <p className="text-(--main-light-blue)">{activeSecrets.length}</p>
          </div>
          {/* //*Active Secrets */}
          <ul>
            {activeSecrets.length > 0 ? (
              activeSecrets.map((secret) => {
                return (
                  <MySecretsItem
                    key={secret.slug}
                    secret={secret}
                    setSelectedSecret={setSelectedSecret}
                    setIsDeleting={setIsDeleting}
                  />
                );
              })
            ) : (
              <MySecretsEmptyList type="Active" />
            )}
          </ul>
        </section>

        {/*//// Viewed */}
        <section className="flex flex-col w-200">
          <div className="flex items-center h-fit justify-between mt-10 mb-2 w-190">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="#02a30f"
                id="Check-Circle-Bold--Streamline-Phosphor"
                height="16"
                width="16"
              >
                <desc>
                  Check Circle Bold Streamline Icon: https://streamlinehq.com
                </desc>
                <path
                  d="M11.5200125 5.64146875c0.34161875 0.34043125 0.34161875 0.8936375 0 1.234075l-4.06518125 4.06518125c-0.34043125 0.34161875 -0.89364375 0.34161875 -1.234075 0l-1.742225 -1.74221875c-0.47499375 -0.475 -0.25766875 -1.28606875 0.3911875 -1.45993125 0.3011375 -0.0806875 0.62244375 0.00540625 0.8428875 0.22585625l1.1259125 1.12445625 3.448875 -3.4496c0.34086875 -0.34004375 0.89295625 -0.33906875 1.232625 0.00218125ZM15.84 8c0 6.0352375 -6.53333125 9.80725625 -11.76 6.7896375 -5.22666875 -3.01761875 -5.22666875 -10.56165625 0 -13.579275C5.27193125 0.5222 6.623675 0.1599375 8 0.16c4.32791875 0.00480625 7.8352 3.51208125 7.84 7.84Zm-1.742225 0c0 -4.69406875 -5.08148125 -7.62786875 -9.1466625 -5.28083125 -4.0651875 2.3470375 -4.0651875 8.214625 0 10.5616625 0.92705625 0.5352375 1.9784125 0.81699375 3.0488875 0.81694375 3.3662125 -0.0036 6.094175 -2.7315625 6.097775 -6.097775Z"
                  strokeWidth="0.0625"
                ></path>
              </svg>
              <h1 className="electrolize text-green-500 font-bold tracking-wider">
                Viewed
              </h1>
            </div>
            <p className="text-green-500">{viewedSecrets.length}</p>
          </div>
          <ul>
            {viewedSecrets.length > 0 ? (
              viewedSecrets.map((secret) => {
                return (
                  <MySecretsItem
                    key={secret.slug}
                    secret={secret}
                    setSelectedSecret={setSelectedSecret}
                    setIsDeleting={setIsDeleting}
                  />
                );
              })
            ) : (
              <MySecretsEmptyList type="Viewed" />
            )}
          </ul>
        </section>

        {/*//! Expired */}
        <section className="flex flex-col w-200">
          <div className="flex items-center h-fit justify-between mt-10 mb-2 w-190">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
                id="Line-Arrow-Synchronize-Warning--Streamline-Core-Remix"
                height="14"
                width="14"
              >
                <desc>
                  Line Arrow Synchronize Warning Streamline Icon:
                  https://streamlinehq.com
                </desc>
                <g id="Free Remix/Interface Essential/line-arrow-synchronize-warning--arrow-fail-notification-sync-warning-failure-synchronize-error">
                  <path
                    id="Union"
                    fill="#fb2c36"
                    fillRule="evenodd"
                    d="M6.99994 1.375c-1.54632 0 -2.94723 0.62367 -3.9646 1.63458h1.07995c0.34518 0 0.625 0.27982 0.625 0.625 0 0.34517 -0.27982 0.625 -0.625 0.625h-2.3704c-0.00869 0.00018 -0.0174 0.00018 -0.02611 0h-0.00735c-0.34518 0 -0.625 -0.27983 -0.625 -0.625V1.23071c0 -0.345175 0.27982 -0.624997 0.625 -0.624997 0.34517 0 0.625 0.279822 0.625 0.624997v0.71787C3.5615 0.817122 5.19978 0.125 6.99994 0.125c3.79696 0 6.87506 3.07806 6.87506 6.87504 0 0.34518 -0.2798 0.625 -0.625 0.625s-0.625 -0.27982 -0.625 -0.625c0 -3.10662 -2.5184 -5.62504 -5.62506 -5.62504ZM7 3.25c0.34518 0 0.625 0.27982 0.625 0.625v3.36541c0 0.34518 -0.27982 0.625 -0.625 0.625s-0.625 -0.27982 -0.625 -0.625V3.875c0 -0.34518 0.27982 -0.625 0.625 -0.625Zm0.00973 7.2595 -0.00958 0.0001c-0.47794 0 -0.86538 -0.3875 -0.86538 -0.86541 0 -0.4747 0.38222 -0.86014 0.8557 -0.86533l0.00957 -0.00008c0.47794 0 0.86539 0.38745 0.86539 0.86539 0 0.47473 -0.38222 0.86013 -0.8557 0.86533ZM1.375 7c0 -0.34518 -0.27982 -0.625 -0.625 -0.625 -0.345178 0 -0.625 0.27982 -0.625 0.625 0 3.797 3.07806 6.875 6.87504 6.875 1.8002 0 3.43846 -0.6921 4.66356 -1.8236v0.7178c0 0.3452 0.2799 0.625 0.625 0.625 0.3452 0 0.625 -0.2798 0.625 -0.625v-2.4038c0 -0.3452 -0.2798 -0.62504 -0.625 -0.62504h-0.0147c-0.0038 -0.00004 -0.0077 -0.00004 -0.0115 0H9.88477c-0.34518 0 -0.625 0.27984 -0.625 0.62504 0 0.3451 0.27982 0.625 0.625 0.625h1.08003c-1.01743 1.0109 -2.41837 1.6346 -3.96476 1.6346C3.89342 12.625 1.375 10.1066 1.375 7Z"
                    clipRule="evenodd"
                    strokeWidth="1"
                  ></path>
                </g>
              </svg>
              <h1 className="electrolize text-red-500 font-bold tracking-wider">
                Expired
              </h1>
            </div>
            <p className="text-red-500">{expiredSecrets.length}</p>
          </div>
          <ul>
            {expiredSecrets.length > 0 ? (
              expiredSecrets.map((secret) => {
                return (
                  <MySecretsItem
                    key={secret.slug}
                    secret={secret}
                    setSelectedSecret={setSelectedSecret}
                    setIsDeleting={setIsDeleting}
                  />
                );
              })
            ) : (
              <MySecretsEmptyList type="Expired" />
            )}
          </ul>
        </section>
      </div>
    </main>
  );
};

export default MySecrets;
