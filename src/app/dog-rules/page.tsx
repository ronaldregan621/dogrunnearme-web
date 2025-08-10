export const metadata = {
  title: '2025 Guide to NYC Dog Rules',
  description: 'Understand leash hours, city-wide regulations, and park-specific guidelines before visiting any NYC dog run.'
};

export default function DogRulesPage() {
  const rules = [
    'Dogs must always be under control of their owner.',
    'Dogs must wear a NYC license tag and a valid rabies tag.',
    'Dogs may not dig, chase, or harm wildlife; damage Park property; or interfere with other Park users.',
    'Always clean up after your dog—including brushed-off hair.',
    'Respect signs, fences, and red flags indicating temporary closures.',
    'Owners may be fined for any violation.'
  ];

  const leashHours = [
    { label: 'Off-leash', time: '6:00 am – 9:00 am & 9:00 pm – 1:00 am' },
    { label: 'Leashed', time: '9:00 am – 9:00 pm' }
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">2025 Guide to NYC Dog Rules</h1>

      <h2 className="text-xl font-semibold text-gray-800 mb-4">City-wide Regulations</h2>
      <ul className="list-disc list-inside space-y-2 mb-8 text-gray-700">
        {rules.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold text-gray-800 mb-4">Central Park Leash Hours</h2>
      <table className="w-full mb-8 text-sm">
        <tbody>
          {leashHours.map((row) => (
            <tr key={row.label} className="border-b last:border-0">
              <td className="py-2 font-medium text-gray-900">{row.label}</td>
              <td className="py-2 text-gray-700">{row.time}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="text-gray-600 mb-8">
        These regulations are enforced by NYC Parks across all boroughs. Individual parks may have additional rules or restricted areas—always read signage on-site.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mb-4">Always-Leash Zones in Central Park</h2>
      <p className="text-gray-700 mb-4">Even during off-leash hours, dogs must stay on leash in the following locations:</p>
      <ul className="list-disc list-inside grid grid-cols-1 sm:grid-cols-2 gap-1 text-gray-700">
        {[
          'Arthur Ross Pinetum',
          'Bridle Path (loop around Reservoir)',
          'Children’s Glade',
          'Conservatory Garden',
          'East Green',
          'East Meadow Oval',
          'Kerbs Boathouse Plaza',
          'North Woods',
          'The Ramble',
          'Shakespeare Garden',
          'Strawberry Fields',
          'Turtle Pond Lawn',
          'West 86-90th Street Lawn',
          'All Central Park Drives'
        ].map((zone) => (
          <li key={zone}>{zone}</li>
        ))}
      </ul>
    </div>
  );
} 