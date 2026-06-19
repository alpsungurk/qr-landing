import { Link } from 'react-router-dom'
import { LEGAL } from '../config/legal'
import { LegalPageShell, LegalSection } from '../components/legal/LegalSection'

export default function KullanimSartlari() {
  return (
    <LegalPageShell
      title="Kullanım Koşulları"
      intro={
        <p>
          Bu Kullanım Koşulları (&quot;Koşullar&quot;), QRKapı web uygulamasına (&quot;Hizmet&quot;) erişim ve kullanımını
          düzenler. Hizmete giriş yaparak veya kullanarak bu Koşulları okuduğunuzu ve kabul ettiğinizi beyan edersiniz.
        </p>
      }
    >
      <LegalSection title="3.1 Taraflar ve kapsam">
        <p>
          Hizmet, <strong>{LEGAL.companyName}</strong> tarafından; personel veya yetkili kullanıcıların QR geçiş kayıtlarını,
          kullanıcı yönetimini ve ilgili operasyonel işlevleri kullanması amacıyla sunulur.
        </p>
      </LegalSection>

      <LegalSection title="3.2 Hesap ve erişim">
        <ul>
          <li>Panele erişim, kurum tarafından tanımlanan e-posta ve şifre ile sağlanır.</li>
          <li>
            Hesap bilgilerinizin gizliliğinden siz sorumlusunuz; şüpheli kullanımda derhal kurumunuzdaki yetkililere bildirmeniz
            gerekir.
          </li>
          <li>Yetkiniz olmayan rollere veya verilere erişmeye çalışmak yasaktır.</li>
        </ul>
      </LegalSection>

      <LegalSection title="3.3 Hizmetin kullanımı">
        <p>Hizmet yalnızca meşru kurumsal amaçlarla kullanılabilir. Özellikle aşağıdakiler yasaktır:</p>
        <ul>
          <li>Sistemlere veya verilere yetkisiz erişim, müdahale veya zarar verme girişimleri</li>
          <li>Otomasyon, tersine mühendislik veya Hizmeti aşırı yükleyecek kötüye kullanım</li>
          <li>Başkası adına veya sahte bilgiyle işlem yapma (örneğin başka bir personelin QR kodunu okutma)</li>
          <li>Konum veya geofence doğrulamasını atlatmaya ya da yanıltmaya yönelik müdahale</li>
          <li>Yürürlükteki mevzuata ve kurum içi düzenlemelere aykırı davranış</li>
        </ul>
      </LegalSection>

      <LegalSection title="3.4 Veri ve gizlilik">
        <p>
          Kişisel verilerin işlenmesi,{' '}
          <Link to="/gizlilik-politikasi" className="underline underline-offset-4 hover:text-slate-900">
            Gizlilik Politikası
          </Link>{' '}
          ve{' '}
          <Link to="/kvkk" className="underline underline-offset-4 hover:text-slate-900">
            KVKK Aydınlatma Metni
          </Link>{' '}
          hükümlerine tabidir.
        </p>
      </LegalSection>

      <LegalSection title="3.5 Fikri mülkiyet">
        <p>
          QRKapı adı, arayüz tasarımı ve yazılım bileşenleri ilgili mevzuat kapsamında korunur. İzinsiz kopyalama, dağıtım veya
          türev çalışma yapılamaz.
        </p>
      </LegalSection>

      <LegalSection title="3.6 Hizmetin değiştirilmesi ve kesintiler">
        <p>
          Hizmet; bakım, güncelleme veya mücbir sebeplerle geçici olarak kesintiye uğrayabilir veya özellikler
          değiştirilebilir. Kesintisiz erişim taahhüt edilmez.
        </p>
      </LegalSection>

      <LegalSection title="3.7 Sorumluluk sınırı">
        <p>
          Hizmet &quot;olduğu gibi&quot; sunulur. Yasaların izin verdiği ölçüde; dolaylı zararlar, veri kaybı, iş kaybı veya üçüncü
          taraf eylemlerinden doğan zararlardan sorumluluk sınırlı veya dışlanmış olabilir.
        </p>
      </LegalSection>

      <LegalSection title="3.8 Fesih">
        <p>Şirket, Koşulların ihlali halinde hesabınızı askıya alma veya sonlandırma hakkını saklı tutar.</p>
      </LegalSection>

      <LegalSection title="3.9 Koşullarda değişiklik">
        <p>Koşullar güncellenebilir. Yürürlükteki sürüm bu sayfada yayımlanır.</p>
      </LegalSection>

      <LegalSection title="3.10 Uygulanacak hukuk ve uyuşmazlık">
        <p>
          Uyuşmazlıklarda Türkiye Cumhuriyeti kanunları uygulanır; yetkili mahkeme ve merciler {LEGAL.jurisdictionCity}{' '}
          mahkemeleri ve icra daireleridir.
        </p>
      </LegalSection>

      <LegalSection title="İletişim">
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
