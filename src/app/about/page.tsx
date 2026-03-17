import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        <section className="py-24 px-8 max-w-4xl mx-auto text-center space-y-12">
          <h1 className="font-serif text-5xl lg:text-7xl">Our Story</h1>
          <p className="font-serif italic text-2xl text-foreground/70 leading-relaxed">
            CraftswomanAlley was born from a simple belief: the most beautiful things in the world are born from the human hand and the physical soul.
          </p>
          <div className="h-px w-20 bg-accent mx-auto"></div>
          <div className="font-sans text-lg text-foreground/70 leading-loose text-justify space-y-8 italic">
            <p>
              इस डिजिटल और मशीनी दुनिया में, हम उन हाथों को सलाम करते हैं जो सलीके, समय और धैर्य के साथ कुछ नया रचते हैं। क्राफ्ट्सवुमन एली (CraftswomanAlley) उन महिला शिल्पकारों की एक साझी गली है जो धागों, रंगों और अपनी रूह के जज्बातों से कहानियों को बुनती हैं।
            </p>
            <p>
              चाहे वो कभी न मुरझाने वाले 'फ़ज़ी वायर' फूल हों या आपकी सबसे आत्मीय भावनाओं को सँजोने वाले ये प्राचीन स्क्रॉल—यहाँ की हर रचना अपने आप में एक विरासत है। हम प्रकृति के सहज और कोमल स्वरूप—जैसे लिनन, क्राफ्ट पेपर और रेशम—की शुद्धता में विश्वास रखते हैं।
            </p>
            <p className="text-center font-serif not-italic text-xl text-neutral-900 border-t border-neutral-100 pt-8">
              धीमी हस्तकला (Slow Craft) की इस खूबसूरत यात्रा में हमारा साथ देने के लिए आपका हृदय से आभार।
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
