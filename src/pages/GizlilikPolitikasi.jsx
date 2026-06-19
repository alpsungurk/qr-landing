import { Link } from 'react-router-dom'
import {
  LEGAL,
  DATA_CATEGORIES,
  THIRD_PARTY_PROCESSORS,
  PROCESSING_PURPOSES,
} from '../config/legal'
import { LegalPageShell, LegalSection, LegalTable } from '../components/legal/LegalSection'

export default function GizlilikPolitikasi() {
  const categoryRows = DATA_CATEGORIES.map((row) => ({
    category: row.category,
    scope: row.scope,
    examples: row.examples,
  }))

  const processorRows = THIRD_PARTY_PROCESSORS.map((row) => ({
    name: row.name,
    role: row.role,
    data: row.data,
  }))

  return (
    <LegalPageShell
      title="Gizlilik Politikası"
      intro={
        <>
          <p>
            Bu Gizlilik Politikası, QRKapı adlı web tabanlı yönetim uygulamasının (&quot;Hizmet&quot;) kullanımı sırasında
            kişisel verilerinizin nasıl işlendiğini açıklar. Hizmeti kullanarak bu politikayı kabul etmiş sayılırsınız.
          </p>
          <p className="mt-4">
            Detaylı KVKK aydınlatması için{' '}
            <Link to="/kvkk" className="underline underline-offset-4 hover:text-slate-900">
              KVKK Aydınlatma Metni
            </Link>{' '}
            sayfasına bakınız.
          </p>
        </>
      }
    >
      <LegalSection title="1.1 Veri sorumlusu">
        <p>
          Kişisel verileriniz, <strong>{LEGAL.companyName}</strong> (&quot;Şirket&quot;; {LEGAL.address}) tarafından 6698
          sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) ve ilgili mevzuat çerçevesinde veri sorumlusu sıfatıyla
          işlenir.
        </p>
        <p>
          Teknik altyapı (kimlik doğrulama, veritabanı, hata izleme, analitik) aşağıda listelenen üçüncü taraf bulut hizmet
          sağlayıcıları üzerinden sağlanır. Bu sağlayıcılar, Şirketin talimatları ve sözleşmesel güvenceler doğrultusunda{' '}
          <strong>veri işleyen</strong> sıfatıyla hareket eder.
        </p>
      </LegalSection>

      <LegalSection title="1.2 İşlenen veri kategorileri">
        <LegalTable
          columns={['Kategori', 'Kapsam', 'Örnek alanlar']}
          rows={categoryRows}
          rowKey="category"
        />
      </LegalSection>

      <LegalSection title="1.3 İşleme amaçları">
        <ul>
          {PROCESSING_PURPOSES.map((purpose) => (
            <li key={purpose}>{purpose}</li>
          ))}
        </ul>
      </LegalSection>

      <LegalSection title="1.4 Hukuki sebepler">
        <p>
          İşleme; KVKK m.5 ve m.6 kapsamında <strong>sözleşmenin kurulması veya ifası</strong> (iş ve hizmet ilişkisi),{' '}
          <strong>veri sorumlusunun hukuki yükümlülüğünü yerine getirmesi</strong> (örneğin iş hukuku kayıt yükümlülükleri),{' '}
          <strong>bir hakkın tesisi veya korunması için zorunlu olma</strong>, <strong>meşru menfaat</strong> veya — zorunlu
          olmayan işlemler için — <strong>açık rıza</strong> sebeplerine dayanır.
        </p>
      </LegalSection>

      <LegalSection title="1.5 Üçüncü taraf hizmet sağlayıcılar (veri işleyenler)">
        <LegalTable
          columns={['Sağlayıcı', 'Rolü', 'İşlenen veri türü']}
          rows={processorRows}
          rowKey="name"
        />
        <p>
          Bu sağlayıcıların kendi gizlilik politikaları da geçerlidir. Şirket, bu sağlayıcılarla yapılan sözleşmelerde KVKK&apos;ya
          uygun veri işleme güvenceleri almakla yükümlüdür.
        </p>
      </LegalSection>

      <LegalSection title="1.6 Yurt dışı aktarım">
        <p>{LEGAL.crossBorderTransfer}</p>
      </LegalSection>

      <LegalSection title="1.7 Saklama süresi">
        <p>
          Veriler, işleme amacının gerektirdiği süre boyunca ve yasal zamanaşımı ile arşivleme yükümlülükleri çerçevesinde
          saklanır. Güncel saklama süreleri:
        </p>
        <ul>
          <li>QR giriş ve çıkış kayıtları ile değişiklik logları: {LEGAL.dataRetention.qrLogs}</li>
          <li>Oturum ve güvenlik logları (IP adresi, tarayıcı kimliği): {LEGAL.dataRetention.sessionLogs}</li>
          <li>İzin ve çalışma süresi kayıtları: {LEGAL.dataRetention.leaveRecords}</li>
        </ul>
        <p>Süre sonunda veriler silinir, yok edilir veya anonim hale getirilir.</p>
      </LegalSection>

      <LegalSection title="1.8 Çerezler ve yerel depolama">
        <p>
          Hizmet, yasal metinlerin onaylandığını hatırlamak için tarayıcınızda zorunlu bir yerel depolama (localStorage) kaydı
          tutar.
        </p>
        <p>
          Ayrıca yukarıda listelenen analitik ve hata izleme sağlayıcıları (Sentry, Vercel Analytics) kendi çerez veya benzer
          izleme teknolojilerini kullanabilir. Zorunlu olmayan çerezler için tarayıcı ayarlarınızdan tercih belirtebilirsiniz;
          bazı çerezlerin engellenmesi Hizmetin bazı işlevlerini etkileyebilir.
        </p>
      </LegalSection>

      <LegalSection title="1.9 Güvenlik">
        <p>
          Oturum ve iletişimde endüstri standardı güvenlik uygulamaları (şifreli iletişim, erişim kontrolleri, rol bazlı
          yetkilendirme) uygulanır; mutlak güvenlik taahhüt edilemez.
        </p>
        <p>Hesap bilgilerinizi üçüncü kişilerle paylaşmamanız önemlidir.</p>
      </LegalSection>

      <LegalSection title="1.10 Haklarınız">
        <p>
          KVKK m.11 kapsamındaki haklarınız için{' '}
          <Link to="/kvkk" className="underline underline-offset-4 hover:text-slate-900">
            KVKK Aydınlatma Metni — Haklar
          </Link>{' '}
          bölümüne bakınız.
        </p>
      </LegalSection>

      <LegalSection title="1.11 Politika değişiklikleri">
        <p>
          Bu metin güncellenebilir. Önemli değişiklikler uygulama içinden veya kurum kanallarıyla duyurulur. Güncel sürüm bu
          sayfada &quot;Son güncelleme&quot; tarihiyle yayımlanır.
        </p>
      </LegalSection>

      <LegalSection title="1.12 İletişim">
        <p>
          Sorularınız için{' '}
          <a className="underline underline-offset-4 hover:text-slate-900" href={`mailto:${LEGAL.supportContact}`}>
            {LEGAL.supportContact}
          </a>{' '}
          adresine yazabilir veya{' '}
          <Link to="/iletisim" className="underline underline-offset-4 hover:text-slate-900">
            iletişim
          </Link>{' '}
          sayfasını kullanabilirsiniz.
        </p>
      </LegalSection>
    </LegalPageShell>
  )
}
