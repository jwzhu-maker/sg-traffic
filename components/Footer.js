function Footer() {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-4 gap-y-10 px-32 py-24 bg-gray-100
    text-gray-600"
    >
      <div className="space-y-4 text-xs text-gray-800">
        <h5 className="font-bold">About</h5>
        <p>How Traffic Camera works</p>
        <p>Data Privacy</p>
      </div>

      <div className="space-y-4 text-xs text-gray-800">
        <h5 className="font-bold">Community</h5>
        <p>Contact Us</p>
        <p>Newsroom</p>
      </div>

      <div className="space-y-4 text-xs text-gray-800">
        <h5 className="font-bold">Host</h5>
        <p>Not a Real Site</p>
        <p>Join Now</p>
      </div>

      <div className="space-y-4 text-xs text-gray-800">
        <h5 className="font-bold">Weather</h5>
        <p>Locations</p>
        <p>Weather Forecast</p>
      </div>
    </div>
  );
}

export default Footer;
