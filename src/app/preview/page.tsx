import PhoneFrame from "./_components/PhoneFrame";

const PreviewPage = (): React.ReactElement => (
  <div
    className="fixed inset-0 flex items-center justify-center"
    style={{ background: "url('/background.png') center / cover no-repeat, #0a0a0f" }}
  >
    <PhoneFrame url="https://senti.today/secret-login" />
  </div>
);

export default PreviewPage;
