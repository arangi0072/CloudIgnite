'use server';
/**
 * @fileOverview An AI agent that recommends optimal virtual office locations and associated services.
 *
 * - aiPoweredLocationRecommendation - A function that handles the virtual office location recommendation process.
 * - AIPoweredLocationRecommendationInput - The input type for the aiPoweredLocationRecommendation function.
 * - AIPoweredLocationRecommendationOutput - The return type for the aiPoweredLocationRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIPoweredLocationRecommendationInputSchema = z.object({
  businessType: z
    .string()
    .describe(
      'The type of business (e.g., SaaS, D2C, e-commerce, consulting, manufacturing).'
    ),
  targetRegions: z
    .array(z.string())
    .describe(
      'An array of Indian states or cities where the business intends to expand or target.'
    ),
  operationalNeeds: z
    .string()
    .describe(
      'Specific operational requirements for the virtual office (e.g., GST registration, company incorporation, mail handling, compliance requirements, client meeting frequency).' 
    ),
});
export type AIPoweredLocationRecommendationInput = z.infer<
  typeof AIPoweredLocationRecommendationInputSchema
>;

const AIPoweredLocationRecommendationOutputSchema = z.object({
  recommendedLocations: z
    .array(
      z.object({
        city: z.string().describe('The recommended city for the virtual office.'),
        address: z
          .string()
          .describe('A high-level description of the virtual office address.'),
        keyBenefits: z
          .array(z.string())
          .describe(
            'Key benefits of this location for the user\'s specific needs.'
          ),
      })
    )
    .describe('An array of recommended virtual office locations.'),
  associatedServices: z
    .array(z.string())
    .describe(
      'An array of specific services BeVirtual can provide for these locations (e.g., GST Registration support, Company Incorporation services, Dedicated Phone Line).' 
    ),
  justification: z
    .string()
    .describe(
      'A brief justification explaining why these locations and services are recommended.'
    ),
});
export type AIPoweredLocationRecommendationOutput = z.infer<
  typeof AIPoweredLocationRecommendationOutputSchema
>;

export async function aiPoweredLocationRecommendation(
  input: AIPoweredLocationRecommendationInput
): Promise<AIPoweredLocationRecommendationOutput> {
  return aiPoweredLocationRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiPoweredLocationRecommendationPrompt',
  input: {schema: AIPoweredLocationRecommendationInputSchema},
  output: {schema: AIPoweredLocationRecommendationOutputSchema},
  prompt: `You are an expert real estate and business expansion consultant for BeVirtual, a premium virtual office provider in India. Your goal is to provide tailored recommendations for optimal virtual office locations and associated services to business owners looking to expand.

Analyze the provided business details, target expansion regions, and specific operational needs to recommend the best virtual office locations and BeVirtual services. Your recommendations should be clear, concise, and focused on helping the business owner make quick and informed decisions.

Business Type: {{{businessType}}}
Target Regions: {{{targetRegions}}}
Operational Needs: {{{operationalNeeds}}}`,
});

const aiPoweredLocationRecommendationFlow = ai.defineFlow(
  {
    name: 'aiPoweredLocationRecommendationFlow',
    inputSchema: AIPoweredLocationRecommendationInputSchema,
    outputSchema: AIPoweredLocationRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
