select users.id, users.name, tickets.seat_number from tickets 
INNER JOIN users on users.id = tickets.user where tickets.train = 11 order by tickets.seat_number asc;

select users.id, users.name, count(*) as `trains_count`, sum(trains.distance)/10 as `total_distance` from tickets 
inner join trains on trains.id = tickets.train inner join users on tickets.user = users.id 
group by users.id order by total_distance desc limit 6;

select trains.id, types.name as `type`, src.name as `src_stn`, dst.name as `dst_stn`, 
timediff(trains.arrival, trains.departure) as `travel_time` from trains 
inner join types on types.id = trains.type inner join stations as src on src.id = trains.source 
inner join stations as dst on dst.id = trains.destination order by travel_time desc limit 6;

select types.name as `type`, src.name as `src_stn`, dst.name as `dst_stn`, trains.departure, trains.arrival,
round(types.fare_rate*trains.distance/100,-3) as fare
from trains inner join types on types.id = trains.type inner join stations as src on src.id = trains.source 
inner join stations as dst on dst.id = trains.destination order by trains.departure;

select trains.id, types.name as `type`, src.name as `src_stn`, dst.name as `dst_stn`,
count(*) as `occupied`, types.max_seats as `maximum`
from trains inner join types on types.id = trains.type inner join stations as `src` on src.id = trains.source 
inner join stations as `dst` on dst.id = trains.destination 
inner join tickets on tickets.train = trains.id group by tickets.train order by trains.id;

select trains.id, types.name as `type`, src.name as `src_stn`, dst.name as `dst_stn`,
count(tickets.id) as `occupied`, types.max_seats as `maximum`
from trains left outer join tickets on tickets.train = trains.id
inner join types on types.id = trains.type inner join stations as `src` on src.id = trains.source 
inner join stations as `dst` on dst.id = trains.destination 
 group by tickets.train order by trains.id;