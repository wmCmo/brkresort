import ContactForm from "@/components/ContactForm";
import { HeaderWithLeaf } from "@/components/HeadersWLeaves";

export default function ContactPage() {
  return (
    <div className="text-accent mt-20 pb-8">
      <HeaderWithLeaf>Contact Us</HeaderWithLeaf>
      <div className="flex flex-wrap justify-center pt-8 gap-4">
        <div className="">
          <h2 className="text-2xl font-bold">Send message</h2>
          <ContactForm />
        </div>
        <div className="max-w-sm">
          <h2 className="text-2xl font-bold">Directions</h2>
          <h4 className="text-xl font-bold mt-4">การเดินทางมาบ้านไร่คุณย่า</h4>
          <h5 className="font-bold mt-2">เดินทาง-รถยต์</h5>
          <p>
            เดินทางจาก ตัวเมือง จ.กาญจนบุรี
            วิ่งทางหลวง 323 มุ่งหน้าอำเภอไทรโยค
            กม.139 ลูกค้าเลี้ยวเข้า พิพิธภัณฑ์ช่องเขาขาด
            ขับตามป้ายลงเขามา ประมาณ 1.5กม
          </p>
          <hr className="border-muted my-4" />
          <h5 className="font-bold mt-2">
            เดินทาง-รถโดยสาร
          </h5>
          <p>
            ลูกค้าลงรถด้านหน้า พิพิธภัณฑ์ช่องเขาขาด
            ทางเรามีรถรับ-ส่ง
          </p>
          <hr className="border-muted my-4" />
          <h5 className="font-bold mt-2">
            เดินทาง-รถไฟ
          </h5>
          เช็คตารางรถไฟตามรูป
          ลงรถไฟ สถานนีสุดท้าย - น้ำตก
          ทางเรามีรถรับ-ส่ง 650บ/เที่ยว

          หรือ นั่งรถบัสจากสถานีรถไฟ
          มุ่งหน้าทองผาภูมิ ลงรถ
          ด้านหน้า พิพิธภัณฑ์ช่องเขาขาด
          ทางเรามีรถรับ-ส่ง
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15461.786114372433!2d98.9333586!3d14.343551!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e46f2f32878b65%3A0x346981d84d04e971!2zQmFuIFJhaSBLaHVuIFlhLeC4muC5ieC4suC4meC5hOC4o-C5iOC4hOC4uOC4k-C4ouC5iOC4sg!5e0!3m2!1sen!2sjp!4v1783933735011!5m2!1sen!2sjp" width="400" height="300" style={{ border: 0, borderRadius: 20 }} allowFullScreen={false} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" className="mt-4"></iframe>
        </div>

      </div>
    </div>
  );
}
