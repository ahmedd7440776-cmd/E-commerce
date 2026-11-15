import ProfileForm from "./ProfileForm";

export default function AccountPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-2xl px-4 py-10">
      <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
        <h1 className="mb-2 text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="mb-6 text-sm text-gray-600">
          View and update your account details.
        </p>
        <ProfileForm />
      </section>
    </main>
  );
}
