import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, Send, MapPin, Phone } from "lucide-react";

const Contact = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Let's <span className="text-accent">Collaborate</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to bring your vision to life? Get in touch with our collective 
            and let's create something extraordinary together.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-semibold mb-8">Get in Touch</h3>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <p className="text-muted-foreground">hello@gridshift.dev</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-medium">Discord</h4>
                  <p className="text-muted-foreground">Join our community</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-medium">Location</h4>
                  <p className="text-muted-foreground">Global Remote Team</p>
                </div>
              </div>
            </div>
            
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-3">What We Offer</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Custom web development and design</li>
                  <li>• Professional photography services</li>
                  <li>• Brand identity and marketing materials</li>
                  <li>• Ongoing support and maintenance</li>
                  <li>• Collaborative approach with transparent communication</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          {/* Contact Form */}
          <Card className="bg-card border-border">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-6">Start a Project</h3>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Name</label>
                    <Input placeholder="Your name" className="bg-secondary border-border" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <Input type="email" placeholder="your@email.com" className="bg-secondary border-border" />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Company</label>
                  <Input placeholder="Your company (optional)" className="bg-secondary border-border" />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Project Type</label>
                  <select className="w-full p-3 bg-secondary border border-border rounded-md">
                    <option>Web Development</option>
                    <option>Graphic Design</option>
                    <option>Photography</option>
                    <option>Branding</option>
                    <option>Multiple Services</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Message</label>
                  <Textarea 
                    placeholder="Tell us about your project..." 
                    className="bg-secondary border-border min-h-[120px]"
                  />
                </div>
                
                <Button size="lg" className="w-full hover-lift">
                  Send Message
                  <Send className="ml-2 w-5 h-5" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;