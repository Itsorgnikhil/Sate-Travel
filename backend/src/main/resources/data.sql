-- Insert some sample locations if not exist (This requires the table to be created first, but DDL auto=update runs before data.sql if configured, or we can just rely on manual insert via API if data.sql causes issues)
-- We will only insert a few basic ones. Since id is auto-increment, we'll insert without id.

INSERT INTO locations (name, lat, lng, type) VALUES ('Downtown Square', 37.7749, -122.4194, 'NEIGHBORHOOD') ON CONFLICT DO NOTHING;
INSERT INTO locations (name, lat, lng, type) VALUES ('Central Station', 37.7786, -122.3893, 'STREET') ON CONFLICT DO NOTHING;
INSERT INTO locations (name, lat, lng, type) VALUES ('North Park Night Market', 37.7858, -122.4064, 'SHOP') ON CONFLICT DO NOTHING;
