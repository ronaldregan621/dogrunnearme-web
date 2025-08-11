import { DogParkQuestion } from '@/types/dogParkQuestion';

export const dogParkQuestions: DogParkQuestion[] = [
  {
    id: 'q1',
    slug: 'what-are-off-leash-hours-in-nyc-parks',
    question: 'What are the off-leash hours in NYC parks?',
    answer: 'In many NYC parks, dogs are allowed off-leash in designated areas from the time the park opens until 9:00 a.m. and from 9:00 p.m. until the park closes. However, these rules can vary, so it\'s always best to check the specific rules for each park, which are listed on our individual park pages.',
    tags: ['rules', 'off-leash'],
    seo: {
      title: 'NYC Park Off-Leash Hours Explained',
      description: 'Learn about the standard off-leash hours for dogs in NYC parks and why it\'s important to check the rules for each specific location.'
    }
  },
  {
    id: 'q2',
    slug: 'what-should-i-bring-to-a-dog-park',
    question: 'What should I bring to a dog park?',
    answer: 'It\'s always a good idea to bring water for your dog, especially on warm days. While many parks have water fountains, they can sometimes be out of service. Also, bring your own waste bags, a sturdy leash, and some of your dog\'s favorite toys for non-peak hours. Make sure your dog is wearing a collar with up-to-date ID tags.',
    tags: ['etiquette', 'preparation'],
    seo: {
      title: 'What to Bring to a Dog Park: A Checklist for Owners',
      description: 'A handy checklist of essential items to bring to the dog park, including water, waste bags, leashes, and more to ensure a safe and fun visit.'
    }
  },
  {
    id: 'q3',
    slug: 'are-all-dog-parks-in-nyc-fenced-in',
    question: 'Are all dog parks in NYC fenced in?',
    answer: 'The vast majority of designated "dog runs" in NYC are securely fenced in to ensure a safe off-leash environment. However, some larger parks have designated "off-leash areas" that may not be fully fenced. Our directory specifies which parks have secure, double-gated entries for added safety.',
    tags: ['safety', 'features'],
    seo: {
      title: 'Are NYC Dog Parks Fenced In? Safety Features to Look For',
      description: 'Learn about the fencing and safety features of NYC dog parks and how to find a securely enclosed area for your dog to play.'
    }
  },
  {
    id: 'q4',
    slug: 'how-do-i-find-a-dog-park-with-separate-small-dog-area',
    question: 'How do I find a dog park with a separate area for small dogs?',
    answer: 'You can use the filters on our main <a href="/parks" class="text-blue-600 hover:underline">parks directory page</a> to find parks with a separate area for small dogs. Simply select the "Separate Areas" amenity filter to see a list of all parks that offer this important safety feature.',
    tags: ['features', 'safety'],
    seo: {
      title: 'How to Find Dog Parks with Separate Small Dog Areas in NYC',
      description: 'A simple guide on how to use our directory to filter for dog parks that have a dedicated, separate area for small dogs, ensuring a safer play environment.'
    }
  },
]; 