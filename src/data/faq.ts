import { about, yearsOfExperience } from './about';
import { business, hoursSummary } from './business';
import { formatPrice, getService, minPrice } from './services';

export interface FaqItem {
  question: string;
  answer: string;
}

const thai = getService('traditionelle-thaimassage');
const back60 = getService('ruecken-nacken-schulter-massage').options.find((o) => o.minutes === 60);
const thaiPrices = thai.options.map((o) => `${formatPrice(o.price)} สำหรับ ${o.minutes} นาที`);
const hours = hoursSummary() ?? 'ในเวลาทำการ';

/** „A B และ C“ */
const listJoin = (items: readonly string[]) => `${items.slice(0, -1).join(' ')} และ${items.at(-1)}`;

/** Antworten bewusst 30–60 Wörter: vollständig, zitierfähig, ohne Einleitung. */
export const faq: FaqItem[] = [
  {
    question: 'นวดแผนไทยที่ Ehningen ราคาเท่าไร',
    answer: `ที่ ${business.name} นวดแผนไทยแบบดั้งเดิมราคา ${thaiPrices.slice(0, -1).join(' ')} และ ${thaiPrices.at(-1)} ${back60 ? `นวดหลัง คอ และบ่าไหล่ราคา ${formatPrice(back60.price)} สำหรับ 60 นาที ` : ''}นวดเท้ากดจุดสะท้อนเริ่มต้นที่ ${formatPrice(minPrice(getService('fussreflexzonenmassage')))} และนวดประคบสมุนไพรเริ่มต้นที่ ${formatPrice(minPrice(getService('kraeuterstempelmassage')))} ทุกราคาเป็นราคาสุทธิ`,
  },
  {
    question: 'Nang มีประสบการณ์มากแค่ไหน',
    answer: `Nang เรียนนวดแผนไทยแบบดั้งเดิมมา และนวดมาแล้ว ${yearsOfExperience} ปี เธอรู้จักกล้ามเนื้อ เส้นเอ็น และจุดกดของการนวดไทยเป็นอย่างดี ความถนัดของเธอคือ ${listJoin(about.focusAreas)} ซึ่งเป็นส่วนที่ความเครียดและการนั่งนาน ๆ สะสมมากที่สุด`,
  },
  {
    question: 'จะนัดเวลาได้อย่างไร',
    answer: `โทรหรือส่ง WhatsApp มาที่ ${business.phone.display} บอกประเภทการนวด ระยะเวลา และเวลาที่สะดวกสักสองสามช่วงได้เลย ติดต่อเราได้${hours} และเราจะยืนยันนัดให้เร็วที่สุด`,
  },
  {
    question: 'เปิดวันเสาร์ วันอาทิตย์ และวันหยุดนักขัตฤกษ์ไหม',
    answer: `เปิด ${business.name} เปิด${hours} รวมถึงวันเสาร์${business.openOnHolidays ? ' วันอาทิตย์ และวันหยุดนักขัตฤกษ์' : ' และวันอาทิตย์'}${business.byAppointment ? ' เวลาอื่นนัดได้ตามสะดวก' : ''} โดยเฉพาะช่วงสุดสัปดาห์ แนะนำให้นัดล่วงหน้าสักสองสามวัน`,
  },
  {
    question: 'การนวดแบบไหนเหมาะกับฉัน',
    answer:
      'ถ้าชอบน้ำหนักมือแน่นและการยืดเหยียด เลือกนวดแผนไทยแบบดั้งเดิม นวดน้ำมันแบบไทยจะสงบและลื่นไหลกว่า สำหรับคอ บ่าไหล่ และศีรษะหากต้องการ เหมาะกับนวดหลัง คอ และบ่าไหล่ ส่วนเท้าที่เมื่อยล้าเหมาะกับนวดเท้ากดจุดสะท้อน ยังไม่แน่ใจ? สอบถามได้ตอนนัดเวลา เรายินดีให้คำแนะนำ',
  },
  {
    question: 'ครั้งแรกควรนวดแผนไทยนานเท่าไร',
    answer:
      'สำหรับครั้งแรกเราแนะนำ 60 นาที ซึ่งเพียงพอสำหรับการนวดทั่วทั้งร่างกาย ถ้าอยากใช้เวลาเต็มที่ เลือก 90 หรือ 120 นาที และสำหรับพักสั้น ๆ ระหว่างวันก็มีนวดแผนไทย 30 นาทีด้วย',
  },
  {
    question: 'ควรใส่อะไรมานวด',
    answer:
      'ใส่เสื้อผ้าสบาย ๆ ก็พอ นวดแผนไทยแบบดั้งเดิมไม่ใช้น้ำมัน เสื้อผ้าหลวม ๆ จึงเหมาะที่สุด สำหรับนวดน้ำมันและนวดประคบสมุนไพร เราจะคุยกับคุณก่อนว่าต้องการถอดเสื้อผ้าชิ้นไหนออก คุณเป็นคนกำหนดว่าอะไรที่ทำให้คุณสบายใจ',
  },
  {
    question: 'Nang Thai Massage เป็นร้านนวดที่สุภาพและน่าเชื่อถือหรือไม่',
    answer:
      'ใช่ เราให้บริการเฉพาะการนวดที่สุภาพตามแบบไทยดั้งเดิมเท่านั้น ได้แก่ นวดแผนไทย นวดน้ำมันแบบไทย นวดหลัง คอ และบ่าไหล่ นวดประคบสมุนไพร และนวดเท้ากดจุดสะท้อน การนวดของเรามีไว้เพื่อการผ่อนคลายและความรู้สึกสบาย',
  },
  {
    question: 'ร้านอยู่ที่ไหน',
    answer: `อยู่ที่ ${business.address.street}, ${business.address.postalCode} ${business.address.city} (${business.address.district}) เดินทางมาจาก ${listJoin(business.nearbyTowns.slice(0, 5))} ได้สะดวก ดูเส้นทางได้ใน Google Maps ลิงก์อยู่ในหน้าติดต่อของเรา`,
  },
  {
    question: 'จอดรถที่ร้านได้ไหม',
    answer: 'ได้ จอดรถริมถนนได้เลย และทางเข้าหาง่าย ถ้ามาด้วยรถไฟ S-Bahn ให้นั่งสาย S1 มาลงที่ Ehningen',
  },
];
