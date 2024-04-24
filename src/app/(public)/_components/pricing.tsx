import { paymentsConfig } from "@/config/payments-config";
import { formatAmountForDisplay } from "@/libs/stripe/stripe-helpers";
import { SubscribeButton } from "./subscribe-button";
import { Typography } from "@/components/ui/typography";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Pricing = () => {
  return (
    <>
      <Typography component="h2" className="text-center">
        {paymentsConfig.title}
      </Typography>
      <Typography className="text-lg text-center">
        {paymentsConfig.description}
      </Typography>

      <div className="px-4 py-8 text-center">
        <div className="flex items-center gap-4 justify-center pb-8">
          <Label htmlFor="anual-mode">Month</Label>
          <Switch id="anual-mode" aria-label="Plan mode" />
          <Label htmlFor="anual-mode">Anual (save %)</Label>
        </div>

        <div className="flex flex-wrap">
          {paymentsConfig.pricingPlans.map((plan) => (
            <div key={plan.id} className="w-full md:w-1/3 px-4 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>
                    {formatAmountForDisplay(
                      plan.price,
                      paymentsConfig.defaultCurrency,
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="menu py-4">
                    {plan.features.map((feature, index) => (
                      <li className="" key={index}>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <SubscribeButton
                    planName={plan.name}
                    priceId={plan.priceId}
                    amount={plan.price}
                  >
                    {plan.cta}
                  </SubscribeButton>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
