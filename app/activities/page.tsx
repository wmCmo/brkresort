import CallToActionButton from "@/components/CallToActionButton";
import { AirplaneTakeoffIcon, StorefrontIcon, TrainIcon } from "@phosphor-icons/react/dist/ssr";
import { ReactNode } from "react";

function HeaderWithLeaf({ children }: { children: ReactNode; }) {
  return (
    <div className="flex justify-center">
      <h2 className="text-2xl relative mt-6 text-center font-bold">
        {children}
        <img src="/svg/leaves.svg" alt="Leaves illustration" className="absolute -top-3 -right-4" />
      </h2>
    </div>
  );
}

function ActivityCard({
  title,
  isFree = false,
  en,
  th,
  children,
}: {
  title: string;
  isFree?: boolean;
  en: string;
  th: string;
  children?: ReactNode;
}) {
  return (
    <div className="rounded-lg bg-foreground border border-border p-4 space-y-2 max-w-sm">
      <div className="flex items-center gap-2">
        <h3 className="font-bold text-xl">{title}</h3>
        {
          isFree
          && <div className="flex">
            <p className="py-1 px-2 font-bold rounded-md bg-border text-muted text-xs">FREE</p>
          </div>
        }
      </div>
      <p>{en}</p>
      <p>{th}</p>
      {children}
    </div>
  );
}

function RouteCard({ title, desc, price, children }: { title: string; desc: string; price: number; children: ReactNode; }) {
  return (
    <div className="max-w-md w-full px-4 py-2 border border-border rounded-lg bg-foreground">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-1">{desc}</p>
      <span className="font-bold font-mono bg-background px-4 py-1 rounded-md inline-block my-2">{price.toLocaleString()} THB</span>
      <div className="flex justify-center">
        {children}
      </div>
    </div>
  );
}

function CommutingCard({ children }: { children: ReactNode; }) {
  return (
    <div className="min-w-xs flex items-center gap-2 bg-foreground rounded-lg border border-border py-2 px-4">
      {children}
    </div>
  );
}

export default function ActivitiesPage() {
  return (
    <div className="mt-20 w-full px-4 text-accent pb-8">
      <h1 className="text-5xl font-bold font-alice text-center">Activities</h1>
      <hr className="mt-4 border-border" />
      <section>
        <HeaderWithLeaf>Explore the Wild!</HeaderWithLeaf>
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          <ActivityCard
            title="Bicycle"
            isFree
            en="Enjoy riding around community area. Hat Ngio temple and the bridge are recommended to vist. Please ask our staff."
            th="ปั่นจักรยานในพื้นที่ แนะนำสะพานวัดหาดงิ้ว"
          />
          <ActivityCard
            title="Trailing"
            isFree
            en="Hiking a historical route: 3-kilometer strech over the remnants of a railway line that was dismantled after World War II. (Please book in Advance)"
            th="เดินชมประวัติศาสตร์ที่ช่องเขาขาด ได้ความรู้และสนุก เรามีรถบริการ เวลา 9:00น. และ 14:00น. ทุกวัน สอบถามเจ้าหน้าที่เพื่อสำรองที่"
          >
            <div className="mt-2 flex justify-center">
              <CallToActionButton
                text="Contact Us"
                href="/contact"
              />
            </div>
          </ActivityCard>
          <ActivityCard
            title="Bamboo Rafting ล่องแพเปียก"
            en="Fun and memorable activity. It goes slowly and safely. Apprximatley 60-90 mins. 9:30AM, 3:00PM, and 5:00PM. 350THB / person, Minimum 4 people."
            th="มาบ้านไร่คุณย่าต้องได้ล่องแพเปียก ล่องตามกระแสน้ำ สนุกและปลอดภัยาก ว่ายน้ำไปพร้อม ๆ กับล่องแพ 60-90 นาที รอบ 9:00, 14:00, 17:00น."
          />
          <ActivityCard
            title="Kayak"
            en="Kayak on river Kwai is the best MUST DO. It takes 120-180 mins. 9:00, 15:00. 24hrs advance booking"
            th="จองล่วงหน้า 24 ชม"
          >
            <div className="rounded-lg overflow-clip border border-border max-w-sm">
              <table className="w-full text-left">
                <thead className="bg-background">
                  <tr>
                    <th className="px-4 py-2">จำนวนคน・Person</th>
                    <th className="px-4">ราคา・Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="px-4 py-2">
                      <span>1-2</span>
                    </td>
                    <td className="px-4">
                      <span><strong>3,500</strong> THB</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">
                      <span>3-5</span>
                    </td>
                    <td className="px-4">
                      <span><strong>3,850</strong> THB</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">
                      <span>6</span>
                    </td>
                    <td className="px-4">
                      <span>
                        <strong>4,600</strong> THB
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 pr-8">
                      <span>Add person</span>
                    </td>
                    <td className="px-4">
                      <span><strong>+650</strong> THB</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex justify-center">
              <CallToActionButton
                text="Contact Us"
                href="/contact"
              />
            </div>
          </ActivityCard>
        </div>
      </section>
      <hr className="mt-8 border-border" />
      <section className="">
        <HeaderWithLeaf>Best Plan for You!</HeaderWithLeaf>
        <div className="mt-4 flex justify-center flex-wrap gap-4">
          <RouteCard
            title="Half-day Trip"
            desc="4 HRs / Choose 1 Visit"
            price={1800}
          >
            <div className="flex flex-wrap gap-4 mt-2">
              <div>
                <h5 className="font-bold">Westbound 🌅</h5>
                <ul className="list-disc list-inside">
                  <li>Hin Dad Hotspring</li>
                  <li>Saiyok Waterfall</li>
                </ul>
              </div>
              <div>
                <h5 className="font-bold">Eastbound 🌄</h5>
                <ul className="list-disc list-inside">
                  <li>Thum Ka-sae Cave</li>
                  <li>Saiyok Elephant Camp</li>
                  <li>Saiyok Noi Waterfall</li>
                  <li>Tha-Sao Town</li>
                </ul>
              </div>
            </div>
          </RouteCard>
          <RouteCard
            title="One-day Trip"
            desc="8 HRs / Choose 3 Visits"
            price={2800}
          >
            <div className="flex flex-wrap gap-4 mt-2">
              <div>
                <h5 className="font-bold">Westbound 🌅</h5>
                <ul className="list-disc list-inside">
                  <li>Hin Dad Hotspring</li>
                  <li>Saiyok Waterfall</li>
                  <li>Hell Fire Pass Museum</li>
                </ul>
              </div>
              <div>
                <h5 className="font-bold">Eastbound 🌄</h5>
                <p>Tha-Sao Town</p>
                <p>Erawan Waterfall</p>
                <p>Thum Ka-Sae Cave</p>
                <p>Saiyok Elephant Camp</p>
                <p>Karnchanaburi City</p>
              </div>
            </div>
          </RouteCard>
        </div>
      </section>
      <hr className="mt-8 border-border" />
      <section className="">
        <HeaderWithLeaf>Commuting Services</HeaderWithLeaf>
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          <CommutingCard>
            <div className="rounded-2xl bg-background p-3">
              <TrainIcon weight="duotone" size={40} />
            </div>
            <div>
              <p><strong>NumTok Train Station</strong></p>
              <p>at 11:00AM</p>
              <p>Fare: <strong>650</strong> THB</p>
            </div>
          </CommutingCard>
          <CommutingCard>
            <div className="rounded-2xl bg-background p-3">
              <StorefrontIcon weight="duotone" size={40} />
            </div>
            <div>
              <p><strong>Karnchanaburi City</strong></p>
              <p>เมืองกาญจนบุรี</p>
              <p>Fare: <strong>1,800</strong> THB</p>
            </div>
          </CommutingCard>
          <CommutingCard>
            <div className="rounded-2xl bg-background p-3">
              <AirplaneTakeoffIcon weight="duotone" size={40} />
            </div>
            <div>
              <p><strong>Bankok / Airport</strong></p>
              <p>SUV 4 Seats: <strong>3,500</strong> THB</p>
              <p>VAN 8 Seats: <strong>4,200</strong> THB</p>
            </div>
          </CommutingCard>
        </div>
      </section>
    </div>
  );
}
