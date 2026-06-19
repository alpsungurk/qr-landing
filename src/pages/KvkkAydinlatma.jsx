import { Link } from 'react-router-dom'
import {
  LEGAL,
  DATA_CATEGORIES,
  PROCESSING_PURPOSES,
  KVKK_RIGHTS,
} from '../config/legal'
import { LegalPageShell, LegalSection, LegalTable, LegalDefinitionList } from '../components/legal/LegalSection'

export default function KvkkAydinlatma() {
  const categoryRows = DATA_CATEGORIES.map((row) => ({
    category: row.category,
    scope: row.scope,
    examples: row.examples,
  }))

  return (
    <LegalPageShell
      title="KVKK Aydınlatma Metni"
      intro={
        <>
          <p>
            6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) m.10 uyarınca hazırlanmıştır. Bu metin,{' '}
            <Link to="/gizlilik-politikasi" className="underline underline-offset-4 hover:text-slate-900">
              Gizlilik Politikası
            </Link>{' '}
            ile birlikte okunmalıdır.
          </p>
        </>
      }
    >
      <LegalSection title="2.1 Veri sorumlusu">
        <LegalDefinitionList
          items={[
            { label: 'Unvan', value: LEGAL.companyName },
            { label: 'Adres', value: LEGAL.address },
            { label: 'MERSİS No', value: LEGAL.mersisNo },
            {
              label: 'E-posta',
              value: (
                <a className="underline underline-offset-4 hover:text-slate-900" href={`mailto:${LEGAL.kvkkEmail}`}>
                  {LEGAL.kvkkEmail}
                </a>
              ),
            },
          ]}
        />
      </LegalSection>

      <LegalSection title="2.2 İşlenen kişisel veriler">
        <p>Gizlilik Politikası Bölüm 1.2&apos;deki tablo aynen geçerlidir:</p>
        <LegalTable
          columns={['Kategori', 'Kapsam', 'Örnek alanlar']}
          rows={categoryRows}
          rowKey="category"
        />
      </LegalSection>

      <LegalSection title="2.3 İşleme amaçları">
        <p>Gizlilik Politikası Bölüm 1.3&apos;teki liste aynen geçerlidir:</p>
        <ul>
          {PROCESSING_PURPOSES.map((purpose) => (
            <li key={purpose}>{purpose}</li>
          ))}
        </ul>
      </LegalSection>

      <LegalSection title="2.4 Hukuki sebepler">
        <p>
          KVKK m.5/2 ve m.6 kapsamında: sözleşmenin kurulması veya ifası, veri sorumlusunun hukuki yükümlülüğünü yerine
          getirmesi, bir hakkın tesisi veya korunması için zorunlu olma, meşru menfaat veya açık rıza (varsa ve hukuka uygunsa).
        </p>
      </LegalSection>

      <LegalSection title="2.5 Kişisel verilerin aktarılması">
        <p>
          Verileriniz; Hizmetin barındırılması, kimlik doğrulama ve veritabanı hizmetleri gibi teknik gereklilikler için{' '}
          <Link to="/gizlilik-politikasi" className="underline underline-offset-4 hover:text-slate-900">
            Gizlilik Politikası Bölüm 1.5
          </Link>
          &apos;te listelenen işleyenlere aktarılabilir.
        </p>
        <p>
          Yurt dışı aktarım söz konusuysa{' '}
          <Link to="/gizlilik-politikasi" className="underline underline-offset-4 hover:text-slate-900">
            Bölüm 1.6
          </Link>
          &apos;daki açıklama geçerlidir. Ayrıca kanuni zorunluluk halinde yetkili kamu kurum ve kuruluşlarına iletilebilir.
        </p>
      </LegalSection>

      <LegalSection title="2.6 Toplama yöntemi">
        <p>
          Veriler; Hizmet üzerinden elektronik ortamda, hesap oluşturma, QR okutma, konum izni verme ve form doldurma gibi
          etkileşimler yoluyla otomatik veya kısmen otomatik yollarla toplanır.
        </p>
      </LegalSection>

      <LegalSection title="2.7 İlgili kişinin KVKK m.11 kapsamındaki hakları">
        <p>KVKK m.11 uyarınca ilgili kişi olarak şu haklara sahipsiniz:</p>
        <ul>
          {KVKK_RIGHTS.map((right) => (
            <li key={right}>{right}</li>
          ))}
        </ul>
      </LegalSection>

      <LegalSection title="2.8 Başvuru yöntemi">
        <p>
          Taleplerinizi, KVKK m.13 ve Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında Tebliğ kapsamında şu kanallardan
          iletebilirsiniz:
        </p>
        <ul>
          <li>
            E-posta:{' '}
            <a className="underline underline-offset-4 hover:text-slate-900" href={`mailto:${LEGAL.kvkkEmail}`}>
              {LEGAL.kvkkEmail}
            </a>
          </li>
          <li>Yazılı başvuru adresi: {LEGAL.kvkkAddress}</li>
          {LEGAL.kepAddress && <li>KEP adresi: {LEGAL.kepAddress}</li>}
        </ul>
        <p>Başvurunuz, talebin niteliğine göre en kısa sürede ve en geç 30 gün içinde sonuçlandırılır.</p>
      </LegalSection>
    </LegalPageShell>
  )
}
