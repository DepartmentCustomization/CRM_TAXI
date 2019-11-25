Select 
rc.Id,
cars_name,
run_km

from RunCar rc
join Cars c on rc.car_id = c.id
where cast(rc.create_date as date) = CAST(current_timestamp as date)