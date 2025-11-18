import React from "react";
import Footer from "@/components/Footer";
import HowItWorks from "@/components/HowItWorks";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Percent, Calculator, ArrowRight } from "lucide-react";

const HowItWorksPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar removed because it is already global */}

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-muted py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  How L-earnings Works
                </h1>
                <p className="text-muted-foreground md:text-xl">
                  Our innovative performance-based pricing model rewards your dedication and mastery.
                  Learn more, pay less—it's that simple.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link to="/courses">
                    <Button size="lg">Browse Courses</Button>
                  </Link>
                  <Link to="/signup">
                    <Button variant="outline" size="lg">Sign Up for Free</Button>
                  </Link>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="relative w-full max-w-md">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 to-accent/20 blur-xl"></div>
                  <Card className="relative border-2 border-primary p-6 overflow-visible">
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                      L-earnings Example
                    </div>

                    <CardContent className="p-0 space-y-6">
                      <div className="grid gap-2 text-center">
                        <h3 className="text-lg font-semibold">Data Science Masterclass</h3>
                        <p className="text-2xl font-bold">$200</p>
                        <p className="text-sm text-muted-foreground">Original course price</p>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="p-2 rounded-lg bg-muted">
                          <p className="text-sm font-medium">Score 70%</p>
                          <p className="text-lg font-bold text-primary">$140 back</p>
                        </div>
                        <div className="p-2 rounded-lg bg-muted">
                          <p className="text-sm font-medium">Score 85%</p>
                          <p className="text-lg font-bold text-primary">$170 back</p>
                        </div>
                        <div className="p-2 rounded-lg bg-primary/10 border border-primary">
                          <p className="text-sm font-medium">Score 95%</p>
                          <p className="text-lg font-bold text-primary">$190 back</p>
                        </div>
                      </div>

                      <div className="pt-4 border-t text-center">
                        <p className="font-medium">Final Cost with 95% Score</p>
                        <p className="text-3xl font-bold text-primary">Only $10</p>
                        <p className="text-xs text-muted-foreground mt-1">Original Price: $200</p>
                      </div>
                    </CardContent>

                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Steps */}
        <HowItWorks />

        {/* Detailed Process */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">

            <div className="flex flex-col items-center text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">The L-earnings Process</h2>
              <p className="mt-4 text-muted-foreground md:text-xl max-w-3xl">
                Our unique educational model is designed to align your financial investment with your educational outcomes.
              </p>
            </div>

            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
              <Card className="relative">
                <CardContent className="pt-12 p-6">
                  <div className="absolute top-0 -translate-y-1/2 left-6 rounded-full bg-primary p-3 text-primary-foreground">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">1. Enrollment</h3>
                  <p className="text-muted-foreground">
                    Browse our course catalog and select a course that meets your goals.
                  </p>
                </CardContent>
              </Card>

              <Card className="relative">
                <CardContent className="pt-12 p-6">
                  <div className="absolute top-0 -translate-y-1/2 left-6 rounded-full bg-primary p-3 text-primary-foreground">
                    <Percent className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">2. Learning Experience</h3>
                  <p className="text-muted-foreground">
                    Study, practice, and master the content at your pace.
                  </p>
                </CardContent>
              </Card>

              <Card className="relative">
                <CardContent className="pt-12 p-6">
                  <div className="absolute top-0 -translate-y-1/2 left-6 rounded-full bg-primary p-3 text-primary-foreground">
                    <Calculator className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">3. Final Assessment</h3>
                  <p className="text-muted-foreground">
                    Complete a final exam and receive a proportional refund based on your score.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Refund Calculation */}
            <div className="mt-16 text-center">
              <h3 className="text-2xl font-bold mb-6">Refund Calculation</h3>
              <div className="max-w-md mx-auto bg-muted p-6 rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-left">
                  <div className="font-medium">Final Score:</div>
                  <div className="font-bold">85%</div>

                  <div className="font-medium">Course Price:</div>
                  <div className="font-bold">$100</div>

                  <div className="font-medium">Refund Percentage:</div>
                  <div className="font-bold text-primary">85%</div>

                  <div className="font-medium">Refund Amount:</div>
                  <div className="font-bold text-primary">$85</div>

                  <div className="col-span-2 pt-4 border-t mt-2">
                    <div className="flex justify-between">
                      <span className="font-semibold">Final Cost:</span>
                      <span className="font-bold text-lg">$15</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
                Refunds are processed within 7 business days.
              </p>
            </div>

          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24 bg-muted">
          <div className="container px-4 md:px-6">

            <div className="flex flex-col items-center text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Frequently Asked Questions</h2>
              <p className="mt-4 text-muted-foreground md:text-xl max-w-3xl">
                Find answers to the most common questions.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible>
                <AccordionItem value="1">
                  <AccordionTrigger>How is my refund calculated?</AccordionTrigger>
                  <AccordionContent>
                    Your refund equals your score percentage.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="2">
                  <AccordionTrigger>When do I receive my refund?</AccordionTrigger>
                  <AccordionContent>
                    Within 7 business days.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div className="mt-12 text-center">
              <p className="mb-6 text-muted-foreground">
                Still have questions?
              </p>
              <Link to="/contact">
                <Button variant="outline">
                  Contact Support
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default HowItWorksPage;
