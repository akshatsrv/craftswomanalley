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
              क्राफ्ट्सवुमन एली (CraftswomanAlley) केवल एक स्टोर नहीं, बल्कि उन हुनरमंद महिला शिल्पकारों का एक साझा मंच है जो अपने हाथों के जादू से बेजान चीजों में जान फूंक देती हैं। हमारी यह 'गली' उन कलाकृतियों का एक सलीके से चुना हुआ संग्रह है, जिन्हें किसी फैक्ट्री की मशीन ने नहीं, बल्कि भारतीय कारीगरों की मेहनत और रूह के जज्बातों ने बनाया है।
            </p>
            <p>
              हम 'स्लो क्राफ्ट' (Slow Craft) में विश्वास रखते हैं—जहाँ हर 'फ़ज़ी वायर' फूल का खिलना और हर 'प्राचीन स्क्रॉल' पर स्याही का उतरना एक साधना है। हम लिनन, हाथ से बने कागज और रेशम जैसे प्राकृतिक तत्वों का उपयोग कर ऐसी विरासत रचते हैं जो समय के साथ और भी कीमती हो जाती है।
            </p>
            <p className="text-center font-serif not-italic text-xl text-neutral-900 border-t border-neutral-100 pt-8 uppercase tracking-widest text-sm">
              हस्तकला की इस रूहानी यात्रा में हमारे साथ जुड़ने और इन महिला कलाकारों का हौसला बढ़ाने के लिए आपका आभार।
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
